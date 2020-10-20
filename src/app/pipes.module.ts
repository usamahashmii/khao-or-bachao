import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundoffPipe } from './roundoff.pipe';
import { DiscountPipe } from './pipes/discount.pipe';
import { StringbreakPipe } from './pipes/stringbreak.pipe';
import { RatingRoundoffPipe } from './ratingroundoff.pipe';

@NgModule({
declarations: [RoundoffPipe , DiscountPipe,StringbreakPipe,RatingRoundoffPipe],
imports: [CommonModule],
exports: [RoundoffPipe , DiscountPipe,StringbreakPipe,RatingRoundoffPipe],
})

export class PipesModule {}