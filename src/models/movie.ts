import { prop, buildSchema, addModelToTypegoose, ReturnModelType } from '@typegoose/typegoose';
import { model, Mongoose, HydratedDocument } from 'mongoose';

import { getConfig } from '../config/get-config';
import { Genres } from '../helpers/genres';

class Movie {
  @prop({ maxlength: 256, required: true })
  public title!: string;

  @prop({ required: true })
  public year!: number;

  @prop({ enum: Genres, required: true, type: String })
  public genres!: Genres[];

  @prop({ maxlength: 256, required: true })
  public director!: string;

  @prop({ required: true })
  public actors!: string;

  @prop()
  public plot?: string;

  @prop()
  public registeredBy?: string;

  @prop()
  public updatedBy?: string;
}

export type IMovieModel = ReturnModelType<typeof Movie>;
export type IMovieDocument = HydratedDocument<Movie>;

let MovieModel: IMovieModel;

export const useMovieModel = (mongoose: Mongoose): IMovieModel => {
  if (MovieModel) {
    return MovieModel;
  }

  const movieSchema = buildSchema(Movie, {
    versionKey: false,
  });

  MovieModel = addModelToTypegoose(model('Movie', movieSchema, getConfig('MONGO_COLLECTION')), Movie, {
    existingMongoose: mongoose,
  });

  return MovieModel;
};
