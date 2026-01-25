import {
  DriverApplicationRequestDTO,
  DriverApplicationResultDTO,
} from "@/application/dto/DriverApplicationDTO.js";
import { IDriverApplicationRepository } from "@/application/interfaces/repository/IDriverApplicationRepository";
import { ICounterService } from "@/application/interfaces/service/ICounterService.js";
import { ICreateDriverApplicationUseCase } from "@/application/interfaces/use-case/driver/ICreateDriverApplicationUseCase";
import { DriverApplicationEntity } from "@/domain/entities/DriverApplicationEntity";
import {
  AppError,
  AppErrorCode,
  DriverApplicationStatus,
  DriverMessages,
  HttpStatus,
} from "@smr/shared";

export class CreateDriverApplicationUseCase implements ICreateDriverApplicationUseCase {
  constructor(
    private readonly _driverApplicationRepository: IDriverApplicationRepository,
    private readonly _counterService: ICounterService,
  ) {}

  /**
   * This function takes the application data from the user
   * checks if the application is duplicating or unnecessary
   * and creates a new application if not.
   *
   * @param data driver application data
   * @returns
   */
  async execute(
    data: DriverApplicationRequestDTO,
  ): Promise<DriverApplicationResultDTO> {
    const existingApplication =
      await this._driverApplicationRepository.findByUserId(data.userId);
    if (
      existingApplication &&
      existingApplication.status == DriverApplicationStatus.PENDING
    ) {
      throw new AppError(
        AppErrorCode.CONFLICT,
        DriverMessages.DRIVER_APPLICATION_PENDING,
        HttpStatus.CONFLICT,
      );
    }

    if (existingApplication && existingApplication.isActive) {
      throw new AppError(
        AppErrorCode.CONFLICT,
        DriverMessages.DRIVER_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const nextSeq = await this._counterService.getNextSequence(
      "driver_application_counter",
    );
    const applicationId = `DAP${String(nextSeq).padStart(5, "0")}`;

    let newApplication: DriverApplicationEntity = {
      applicationId: applicationId,
      userId: data.userId,
      email: data.email,

      licenseNumber: data.licenseNumber,
      licenseExpiry: new Date(data.licenseExpiry),
      licenseImage: data.licenseImage,

      vehicleType: data.vehicleType,
      vehicleBrand: data.vehicleBrand,
      vehicleModel: data.vehicleModel,
      vehicleImage: data.vehicleImage,

      registrationNumber: data.registrationNumber,
      registrationImage: data.registrationImage,
      registrationExpiry: new Date(data.registrationExpiry),

      insuranceNumber: data.insuranceNumber,
      insuranceExpiry: new Date(data.insuranceExpiry),
      insuranceImage: data.insuranceImage,

      status: DriverApplicationStatus.PENDING,
      isActive: true,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    newApplication =
      await this._driverApplicationRepository.save(newApplication);

    return {
      applicationId: newApplication.applicationId,
      userId: newApplication.userId,
    };
  }
}
