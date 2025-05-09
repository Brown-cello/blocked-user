import { CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { blockException } from "../exception/block.exception";

  
export class BlockGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const IsBlocked =request.user?.IsBlocked;

        if (IsBlocked===true) {
            throw new blockException('user is blocked ')
    }
    return true;    
}}