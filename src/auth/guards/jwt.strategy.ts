import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "dotenv";
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'loggedIn') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET
    })
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
