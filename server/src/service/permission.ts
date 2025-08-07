import Permission, { PermissionAttributes, PermissionInstance } from "../models/permission"
import { GlobalResponse, OptionsInterface } from "../types/global"
import QueryExtractor from "../utils/queryExtractor"

const GetPermission = async (data?: OptionsInterface): Promise<GlobalResponse> => {
  const queryData = QueryExtractor(data)
  const result = await Permission.findAll({
    ...queryData
  })
  if (result?.length) {
    return { success: true, data: result }
  } else {
    return { success: false, data: result, message: "Permissions Not Found" }
  }
}

const GetPermissionById = async (id: number): Promise<GlobalResponse> => {
  const result = await Permission.findOne({
    where: {
      id
    }
  })
  if (result) {
    return { success: true, data: result }
  } else {
    return { success: false, data: result, message: 'Permission Not Found' }
  }
}

const AddPermission = async (data: PermissionAttributes): Promise<GlobalResponse> => {
  const result = await Permission.create(data)
  if (result) {
    return { success: true, data: result, message: "Permission Added" }
  } else {
    return { success: false, data: result, message: "Permission Not Added" }
  }
}

const UpdatePermissionById = async (id: number, data: Partial<PermissionInstance>): Promise<GlobalResponse> => {
  const result = await Permission.update(data, {
    where: { id }
  })
  if (result?.[0]) {
    return { success: true, message: 'Permission Updated' }
  } else {
    return { success: false, message: 'Permission Not Updated' }
  }
}

const RemovePermissionById = async (id: number) => {
  const result = await Permission.destroy({
    where: { id }
  })
  if (result) {
    return { success: true, message: 'Permission Deleted' }
  } else {
    return { success: false, message: 'Error while Deleting Permission' }
  }
}

const RestorePermissionById = async (id: number) => {
  await Permission.restore({
    where: { id }
  })
  return { success: true, message: "Restored" }
}

export default {
  GetPermission,
  GetPermissionById,
  AddPermission,
  UpdatePermissionById,
  RemovePermissionById,
  RestorePermissionById,
}