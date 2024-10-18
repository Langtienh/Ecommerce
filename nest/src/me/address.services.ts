import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { Address } from './entity/address.entity'

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) private addressRepo: Repository<Address>) {}

  async create(userId: number, body: CreateAddressDto) {
    const addressCount = await this.addressRepo.count({ where: { userId } })
    if (addressCount >= 5) {
      throw new BadRequestException('Số lượng địa chỉ tối đa là 5')
    }
    if (body.isDefault && addressCount > 0) {
      await this.addressRepo.update({ userId }, { isDefault: false })
    }
    return this.addressRepo.save({ ...body, userId })
  }

  async update(userId: number, addressId: number, body: UpdateAddressDto) {
    const address = await this.addressRepo.findOne({ where: { userId, id: addressId } })
    if (!address) {
      throw new NotFoundException('Không tìm thấy địa chỉ')
    }
    Object.assign(address, body)
    return this.addressRepo.save(address)
  }

  async delete(userId: number, addressId: number) {
    const address = await this.addressRepo.findOne({ where: { userId, id: addressId } })
    if (!address) {
      throw new NotFoundException('Không tìm thấy địa chỉ')
    }
    await this.addressRepo.delete({ userId, id: addressId })
  }

  async findAll(userId: number) {
    return this.addressRepo.find({ where: { userId } })
  }

  async findOne(userId: number, addressId: number) {
    const address = await this.addressRepo.findOne({ where: { userId, id: addressId } })
    if (!address) {
      throw new NotFoundException('Không tìm thấy địa chỉ')
    }
    return address
  }
}
