import { Crud } from '@/lib/crud'
import { AddResourceType, Resource, UpdateResourceType } from './resource.schema'

class ResourceRequest extends Crud<
  Resource,
  Resource,
  Resource,
  AddResourceType,
  UpdateResourceType
> {}

export const resourceRequest = new ResourceRequest('resources')
