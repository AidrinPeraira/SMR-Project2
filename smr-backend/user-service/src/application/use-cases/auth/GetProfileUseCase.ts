import { UserProfileResultDTO } from "@/application/dto/UserDTO.js";
import { IDriverRepository } from "@/application/interfaces/repository/IDriverRepository.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { IVehicleRepository } from "@/application/interfaces/repository/IVehicleRepository.js";
import { IGetProfileUseCase } from "@/application/interfaces/use-case/auth/IGetProfileUseCase.js";
import { AppError, AppErrorCode, AuthMessages, HttpStatus } from "@smr/shared";

export class GetProfileUseCase implements IGetProfileUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _driverRepository: IDriverRepository,
    private readonly _vehicleRepository: IVehicleRepository,
  ) {}

  async execute(userId: string): Promise<UserProfileResultDTO> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const driver = await this._driverRepository.findByUserId(userId);

    let vehicles = null;
    if (driver) {
      vehicles = await this._vehicleRepository.findByDriverId(driver.driverId);
    }

    return {
      user: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage ?? "",
        role: user.role,
      },
      driver: driver
        ? {
            driverId: driver.driverId,
            licenseNumber: driver.licenseNumber,
            licenseExpiry: driver.licenseExpiry,
            licenseImage: driver.licenseImage,
            isVerified: driver.isVerified,
            createdAt: driver.createdAt,
            updatedAt: driver.updatedAt,
          }
        : null,
      vehicles: vehicles
        ? vehicles.map((v) => ({
            vehicleId: v.vehicleId,
            driverId: v.driverId,
            type: v.type,
            brand: v.brand,
            modelName: v.modelName,
            image: v.image,
            registrationNumber: v.registrationNumber,
            registrationImage: v.registrationImage,
            registrationExpiry: v.registrationExpiry,
            insuranceNumber: v.insuranceNumber,
            insuranceImage: v.insuranceImage,
            insuranceExpiry: v.insuranceExpiry,
            createdAt: v.createdAt,
            updatedAt: v.updatedAt,
          }))
        : null,
    };
  }
}
