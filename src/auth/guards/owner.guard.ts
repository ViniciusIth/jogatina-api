import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class OwnerGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtToken: string = (request.rawHeaders as string)[1];
    const decodedToken = JSON.parse(Buffer.from(jwtToken.split('.')[1], 'base64').toString());

    if (
      decodedToken.id === request.body.id ||
      decodedToken.id === request.params.id
      ) {
      return true
    }
    return false

  }

}
