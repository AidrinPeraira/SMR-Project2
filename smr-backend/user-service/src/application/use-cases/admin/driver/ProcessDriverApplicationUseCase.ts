import { DriverApplicationActionDTO } from "@/application/dto/DriverApplicationDTO.js";
import { IDriverApplicationRepository } from "@/application/interfaces/repository/IDriverApplicationRepository.js";
import { IDriverRepository } from "@/application/interfaces/repository/IDriverRepository.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { IVehicleRepository } from "@/application/interfaces/repository/IVehicleRepository.js";
import { ICounterService } from "@/application/interfaces/service/ICounterService.js";
import { IEventBus } from "@/application/interfaces/service/IEventBus.js";
import { IProcessDriverApplicationUseCase } from "@/application/interfaces/use-case/admin/driver/IProcessDriverApplicationUseCase.js";
import { DriverEntity } from "@/domain/entities/DriverEntity.js";
import { VehicleEntity } from "@/domain/entities/VehicleEntity.js";
import {
  AdminComment,
  AppError,
  AppErrorCode,
  AppMessages,
  AuthMessages,
  DriverApplicationActionEvent,
  DriverApplicationStatus,
  DriverMessages,
  EventName,
  HttpStatus,
} from "@smr/shared";

export class ProcessDriverApplicationUseCase implements IProcessDriverApplicationUseCase {
  constructor(
    private readonly _driverApplicationRepository: IDriverApplicationRepository,
    private readonly _driverRepository: IDriverRepository,
    private readonly _vehicleRepository: IVehicleRepository,
    private readonly _eventBus: IEventBus,
    private readonly _counterService: ICounterService,
    private readonly _userRepository: IUserRepository,
  ) {}

  /**
   * This function takes details about the action taken on
   * the driver application by the admin and process the application
   *
   * if approved. it creates a new driver and vehicle.
   *
   * it also publishes an event to notify user.
   *
   * @param action action detils form req
   */
  async execute(action: DriverApplicationActionDTO): Promise<void> {
    if (
      !action.adminId ||
      !action.applicationId ||
      !action.applicationStatus ||
      !action.comment
    ) {
      throw new AppError(
        AppErrorCode.UNPROCESSABLE_ENTITY,
        AppMessages.UNPROCESSABLE_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const application = await this._driverApplicationRepository.findById(
      action.applicationId,
    );

    if (!application) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        DriverMessages.DRIVER_APPLICATION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      (application.status as DriverApplicationStatus) !==
      DriverApplicationStatus.PENDING
    ) {
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AppMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this._userRepository.findById(application.userId);

    if (!user) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    let eventName;

    if (action.applicationStatus === DriverApplicationStatus.APPROVED) {
      eventName = EventName.DRIVER_APPLICATION_APPROVED;
    } else if (action.applicationStatus === DriverApplicationStatus.REJECTED) {
      eventName = EventName.DRIVER_APPLICATION_REJECTED;
    } else {
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AppMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const now = new Date();

    const adminComment: AdminComment = {
      adminId: action.adminId,
      content: action.comment,
      statusAtTime: action.applicationStatus,
      timestamp: now,
    };

    await this._driverApplicationRepository.update(action.applicationId, {
      status: action.applicationStatus,
      isActive: false,
      adminComments: application.adminComments
        ? [...application.adminComments, adminComment]
        : [adminComment],
      updatedAt: now,
    });

    //create driver and vehicle only if apprived
    if (action.applicationStatus === DriverApplicationStatus.APPROVED) {
      const nextDriverSeq =
        await this._counterService.getNextSequence("driver_counter");
      const driverId = `DVR${String(nextDriverSeq).padStart(5, "0")}`;

      const driver: DriverEntity = {
        driverId: driverId,
        userId: application.userId,
        licenseNumber: application.licenseNumber,
        licenseExpiry: application.licenseExpiry,
        licenseImage: application.licenseImage,
        isVerified: true,
        createdAt: now,
        updatedAt: now,
      };
      await this._driverRepository.save(driver);

      const nextVEhicleSeq =
        await this._counterService.getNextSequence("vehicle_counter");
      const vehicleId = `VEH${String(nextVEhicleSeq).padStart(5, "0")}`;

      const vehicle: VehicleEntity = {
        vehicleId: vehicleId,
        driverId: driver.driverId,
        type: application.vehicleType,
        brand: application.vehicleBrand,
        modelName: application.vehicleModel,
        image: application.vehicleImage,
        registrationNumber: application.registrationNumber,
        registrationImage: application.registrationImage,
        registrationExpiry: application.registrationExpiry,
        insuranceNumber: application.insuranceNumber,
        insuranceImage: application.insuranceImage,
        insuranceExpiry: application.insuranceExpiry,
        createdAt: now,
        updatedAt: now,
      };
      await this._vehicleRepository.save(vehicle);
    }

    //publish and event to triger email notification
    const event: DriverApplicationActionEvent = {
      event: eventName,
      data: {
        email_id: user.email,
        user_name: user.firstName + " " + user.lastName,
        application_id: application.applicationId,
        application_status: action.applicationStatus,
        admin_comment: action.comment,
      },
      timestamp: now,
    };

    await this._eventBus.publish(event);
  }
}
