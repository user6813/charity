import Role, { RoleAttributes, RoleInstance } from "../models/role"
import { GlobalResponse, OptionsInterface } from "../types/global"
import QueryExtractor from "../utils/queryExtractor"

const GetRole = async (data?: OptionsInterface): Promise<GlobalResponse> => {
const queryData = QueryExtractor(data)
  const result = await Role.findAll({ ...queryData})
  if (result?.length) {
    return { success: true, data: result }
  } else {
    return { success: false, data: result, message: "Roles Not Found" }
  }
}

const GetRoleById = async (id: number): Promise<GlobalResponse> => {
  const result = await Role.findOne({
    where: {
      id
    }
  })
  if (result) {
    return { success: true, data: result }
  } else {
    return { success: false, data: result, message: 'Role Not Found' }
  }
}

const AddRole = async (data: RoleAttributes): Promise<GlobalResponse> => {
  const result = await Role.create(data)
  if (result) {
    return { success: true, data: result, message: "Role Added" }
  } else {
    return { success: false, data: result, message: "Role Not Added" }
  }
}

const UpdateRoleById = async (id: number, data: Partial<RoleInstance>): Promise<GlobalResponse> => {
  const result = await Role.update(data, {
    where: { id }
  })
  if (result?.[0]) {
    return { success: true, message: 'Role Updated' }
  } else {
    return { success: false, message: 'Role Not Updated' }
  }
}

const RemoveRoleById = async (id: number) => {
  const result = await Role.destroy({
    where: { id }
  })
  if (result) {
    return { success: true, message: 'Role Deleted' }
  } else {
    return { success: false, message: 'Error while Deleting Role' }
  }
}

const RestoreRoleById = async (id: number) => {
  await Role.restore({
    where: { id }
  })
  return { success: true, message: "Restored" }
}

export default {
  GetRole,
  GetRoleById,
  AddRole,
  UpdateRoleById,
  RemoveRoleById,
  RestoreRoleById,
}