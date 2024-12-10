import { Crud } from '@/lib/crud'
import { AddResourceType, Resource, ResourceDetail, UpdateResourceType } from './resource.schema'

class ResourceRequest extends Crud<
  ResourceDetail,
  Resource,
  Resource,
  AddResourceType,
  UpdateResourceType
> {}

export const resourceRequest = new ResourceRequest('resources')
