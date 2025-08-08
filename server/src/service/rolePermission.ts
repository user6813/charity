import { GlobalResponse } from "../types/global"
import Role from "../models/role"
import Permission, { PermissionAttributes } from "../models/permission"
import RolePermission from "../models/rolePermission"
import { Op } from "sequelize"

const GetRolePermisison = async (roleId: number): Promise<GlobalResponse> => {
    const result = await Role.findOne({
        where: {
            id: roleId
        },
        include: [
            {
                model: Permission,
                as: 'permissions',
            }
        ]
    })
    if (result) {
        return { success: true, data: result }
    } else {
        return { success: false, data: result, message: 'Role Not Found' }
    }
}


const UpdateRolePermission = async (roleId: number, permissionIds: Array<number>): Promise<GlobalResponse> => {
    const result = await GetRolePermisison(roleId)
    if (!result.success) {
        return result
    }
    const existPermissions = result?.data?.permissions?.map((permission: PermissionAttributes) => permission.id)
    const newPermissions = permissionIds.filter((permissionId: number) => !existPermissions?.includes(permissionId))
    const deletedPermissions = existPermissions?.filter((permissionId: number) => !permissionIds?.includes(permissionId))

    if (newPermissions?.length) {
        newPermissions.forEach(async (permissionId: number) => {
            const deletedRolePermission = await RolePermission.findOne({
                where: {
                    roleId,
                    permissionId
                },
                paranoid: false
            })
            if (deletedRolePermission) {
                await deletedRolePermission.restore()
            }else{
                await RolePermission.create({
                    roleId,
                    permissionId
                })
            }
        })
    }

    if (deletedPermissions?.length) {
        await RolePermission.destroy({
            where: {
                roleId,
                permissionId: {
                    [Op.in]: deletedPermissions
                }
            }
        })
    }

    return { success: true, message: 'Role Permissions Updated' }
}

export default {
    GetRolePermisison,
    UpdateRolePermission
}