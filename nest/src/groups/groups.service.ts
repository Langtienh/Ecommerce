import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourcesService } from 'src/resources/resources.service';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepo: Repository<Group>,
    private resourceService: ResourcesService,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    await this.resourceService.findOne(createGroupDto.resourceId);
    return this.groupRepo.save(createGroupDto);
  }

  findAll() {
    return this.groupRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const group = await this.groupRepo.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);
    Object.assign(group, updateGroupDto);
    return this.groupRepo.save(group);
  }

  remove(id: number) {
    return this.groupRepo.softDelete(id);
  }
}
