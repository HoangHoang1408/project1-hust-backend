import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/role.decorator';
import { CurrentUser } from 'src/auth/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { BookingService } from './booking.service';
import { CheckVehicleAvailableInput, CheckVehicleAvailableOutput } from './dto';
import {
  CreateBookingInput,
  CreateBookingOutput,
  GetBookingDetailInput,
  GetBookingDetailOutput,
  GetBookingsByInput,
  GetBookingsByOutput,
  UpdateBookingStatusInput,
  UpdateBookingStatusOutput,
} from './dto/booking.dto';

import { Booking } from './entities/booking.entity';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Roles(['Any'])
  @Query(() => CheckVehicleAvailableOutput)
  checkVehicleAvailable(@Args('input') input: CheckVehicleAvailableInput) {
    return this.bookingService.checkVehicleAvailable(input);
  }

  @Roles(['Any'])
  @Query(() => GetBookingDetailOutput)
  getBookingDetail(
    @CurrentUser() currentUser,
    @Args('input') input: GetBookingDetailInput,
  ) {
    return this.bookingService.getBookingDetail(currentUser, input);
  }
  @Roles(['Any'])
  @Query(() => GetBookingsByOutput)
  getBookingsBy(
    @CurrentUser() currentUser,
    @Args('input') input: GetBookingsByInput,
  ) {
    return this.bookingService.getBookingsBy(currentUser, input);
  }

  @Roles(['Normal'])
  @Mutation(() => CreateBookingOutput)
  createBooking(
    @CurrentUser() currentUser: User,
    @Args('input') input: CreateBookingInput,
  ) {
    return this.bookingService.createBooking(currentUser, input);
  }

  @Mutation(() => UpdateBookingStatusOutput)
  updateBookingStatus(@Args('input') input: UpdateBookingStatusInput) {
    return this.bookingService.updateBookingStatus(input);
  }
}
