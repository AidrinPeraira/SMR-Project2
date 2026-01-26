import { GetProfileUseCase } from "@/application/use-cases/auth/GetProfileUseCase.js";
import { ProfileController } from "@/presentation/controllers/ProfileController.js";
import { DriverModel } from "@/infrastructure/database/models/MongoDriverModel.js";
import { UserModel } from "@/infrastructure/database/models/MongoUserModel.js";
import { VehicleModel } from "@/infrastructure/database/models/MongoVehicleModel.js";
import { MongoDriverRepository } from "@/infrastructure/repository/mongodb/MongoDriverRepository.js";
import { MongoUserRepository } from "@/infrastructure/repository/mongodb/MongoUserRepository.js";
import { MongoVehicleRepository } from "@/infrastructure/repository/mongodb/MongoVehicleRepository.js";

//------ repository ------------------
const userRepository = new MongoUserRepository(UserModel);
const driverRepository = new MongoDriverRepository(DriverModel);
const vehicleRepository = new MongoVehicleRepository(VehicleModel);

//------ use case ------------------
const getProfileUseCase = new GetProfileUseCase(
  userRepository,
  driverRepository,
  vehicleRepository,
);

//------ controller ------------------
export const profileController = new ProfileController(getProfileUseCase);
