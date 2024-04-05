import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { ItemDTO } from 'src/user/dtos/item.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/')
  async getCart(@Request() req) {
    const userId = req.user.userId;
    const cart = await this.cartService.getCart(userId);
    return cart;
  }
  @Post('/')
  async addItemToCart(@Request() req, @Body() itemDto: ItemDTO) {
    const userId = req.user.userId;
    const cart = await this.cartService.addItemToCart(userId, itemDto);
    return cart;
  }

  @Delete('/')
  async remoteItemFromCart(@Request() req, @Body() { productId }) {
    const userId = req.user.userId;
    const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
  }

  @Delete('/:id')
  async deleteCart(@Param('id') userId: string) {
    const cart = await this.cartService.deleteCart(userId);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
}
