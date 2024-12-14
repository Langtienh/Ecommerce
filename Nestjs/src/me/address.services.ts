import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { Address } from './entity/address.entity'

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) private addressRepository: Repository<Address>) {}

  async create(userId: number, body: CreateAddressDto) {
    const addressCount = await this.addressRepository.count({ where: { userId } })
    if (addressCount >= 5) {
      throw new BadRequestException('Số lượng địa chỉ tối đa là 5')
    }
    if (body.isDefault && addressCount > 0) {
      await this.addressRepository.update({ userId }, { isDefault: false })
    }
    return this.addressRepository.save({ ...body, userId })
  }

  async update(userId: number, addressId: number, body: UpdateAddressDto) {
    const address = await this.addressRepository.findOne({
      where: { userId, id: addressId }
    })
    if (!address) {
      throw new NotFoundException('Không tìm thấy địa chỉ')
    }
    Object.assign(address, body)
    return this.addressRepository.save(address)
  }

  async delete(userId: number, addressId: number) {
    const address = await this.addressRepository.findOne({
      where: { userId, id: addressId }
    })
    if (!address) {
      throw new NotFoundException('Không tìm thấy địa chỉ')
    }
    await this.addressRepository.delete({ userId, id: addressId })
  }

  async findAll(userId: number) {
    return this.addressRepository.find({ where: { userId } })
  }

  async findOne(userId: number, addressId: number) {
    const address = await this.addressRepository.findOne({
      where: { userId, id: addressId }
    })
    if (!address) {
      throw new NotFoundException('Không tìm thấy địa chỉ')
    }
    return address
  }

  async deleteMany(userId: number, addressIds: number[]) {
    const address = await this.addressRepository.countBy({ userId, id: In(addressIds) })
    if (address !== addressIds.length) {
      throw new NotFoundException('Không tìm thấy địa chỉ')
    }
    await this.addressRepository.delete(addressIds)
  }
}
