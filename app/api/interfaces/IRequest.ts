import { Request } from 'express';

export default interface IRequest extends Request {
  currentUser?: any;
};
