import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource) private resourceRepo: Repository<Resource>,
  ) {}

  async isResourceNameExist(name: string) {
    const resource = await this.resourceRepo.findOne({ where: { name } });
    if (resource) {
      throw new ConflictException('Resource already exists');
    }
    return resource;
  }

  async create(createResourceDto: CreateResourceDto, creatorId: number) {
    await this.isResourceNameExist(createResourceDto.name);
    return this.resourceRepo.save({
      ...createResourceDto,
      creatorId,
      updatorId: creatorId,
    });
  }

  findAll() {
    return this.resourceRepo.find();
  }

  async findOne(id: number) {
    const resource = await this.resourceRepo.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    return resource;
  }

  async update(
    id: number,
    updateResourceDto: UpdateResourceDto,
    updatorId: number,
  ) {
    const { name } = updateResourceDto;
    const resource = await this.resourceRepo.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    if (name && resource.name !== name) this.isResourceNameExist(name);
    Object.assign(resource, {
      ...updateResourceDto,
      updatorId,
      creatorId: updatorId,
    });
    return this.resourceRepo.save(resource);
  }

  remove(id: number) {
    return this.resourceRepo.softDelete(id);
  }
}
