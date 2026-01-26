//we use this file to pass all the dependencies for dependency injection.
//this reduces code in index.js

import { CreateDriverApplicationUseCase } from "@/application/use-cases/driver/CreateDriverApplicationUseCase.js";
import { CounterModel } from "@/infrastructure/database/models/MongoCounterModel.js";
import { DriverApplicationModel } from "@/infrastructure/database/models/MongoDriverApplicationModel.js";
import { MongoDriverApplicationRepository } from "@/infrastructure/repository/mongodb/MongoDriverApplicationRepository.js";
import { MongoCounterService } from "@/infrastructure/services/CounterService.js";
import { DriverController } from "@/presentation/controllers/DriverController.js";

// ------------ repositories ------------------
const driverApplicationRepository = new MongoDriverApplicationRepository(
  DriverApplicationModel,
);

// ------------ services ------------------
const counterService = new MongoCounterService(CounterModel);

// ------------ use cases ------------------
const createDriverApplicationUseCase = new CreateDriverApplicationUseCase(
  driverApplicationRepository,
  counterService,
);

// ------------ controller ------------------
export const driverController = new DriverController(
  createDriverApplicationUseCase,
);
