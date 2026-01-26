import { ProcessDriverApplicationUseCase } from "@/application/use-cases/admin/driver/ProcessDriverApplicationUseCase.js";
import { CounterModel } from "@/infrastructure/database/models/MongoCounterModel.js";
import { DriverApplicationModel } from "@/infrastructure/database/models/MongoDriverApplicationModel.js";
import { DriverModel } from "@/infrastructure/database/models/MongoDriverModel.js";
import { UserModel } from "@/infrastructure/database/models/MongoUserModel.js";
import { VehicleModel } from "@/infrastructure/database/models/MongoVehicleModel.js";
import { MongoDriverApplicationRepository } from "@/infrastructure/repository/mongodb/MongoDriverApplicationRepository.js";
import { MongoDriverRepository } from "@/infrastructure/repository/mongodb/MongoDriverRepository.js";
import { MongoUserRepository } from "@/infrastructure/repository/mongodb/MongoUserRepository.js";
import { MongoVehicleRepository } from "@/infrastructure/repository/mongodb/MongoVehicleRepository.js";
import { MongoCounterService } from "@/infrastructure/services/CounterService.js";
import { AdminController } from "@/presentation/controllers/AdminController.js";
import { eventBus } from "@/presentation/factories/EventBusFactory.js";

// ------------ repositories ------------------
const driverApplicationReposiory = new MongoDriverApplicationRepository(
  DriverApplicationModel,
);
const driverRepository = new MongoDriverRepository(DriverModel);
const vehicleRepository = new MongoVehicleRepository(VehicleModel);
const userRepository = new MongoUserRepository(UserModel);

// ------------ services ------------------
const counterService = new MongoCounterService(CounterModel);

// ------------ use cases ------------------
const processDriverApplicationUseCase = new ProcessDriverApplicationUseCase(
  driverApplicationReposiory,
  driverRepository,
  vehicleRepository,
  eventBus,
  counterService,
  userRepository,
);

// ------------ controller ------------------
export const adminController = new AdminController(
  processDriverApplicationUseCase,
);
