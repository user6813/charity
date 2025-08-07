import User, { UserInstance } from "../models/user"
import { GlobalResponse, OptionsInterface } from "../types/global"
import QueryExtractor from "../utils/queryExtractor"

const GetUser = async (data?: OptionsInterface): Promise<GlobalResponse> => {
const queryData = QueryExtractor(data)
  const result = await User.findAll({ ...queryData})
  if (result?.length) {
    return { success: true, data: result }
  } else {
    return { success: false, data: result, message: "Users Not Found" }
  }
}

const GetUserById = async (id: number): Promise<GlobalResponse> => {
  const result = await User.findOne({
    where: {
      id
    }
  })
  if (result) {
    return { success: true, data: result }
  } else {
    return { success: false, data: result, message: 'User Not Found' }
  }
}

const UpdateUserById = async (id: number, data: Partial<UserInstance>): Promise<GlobalResponse> => {
  const result = await User.update(data, {
    where: { id }
  })
  if (result?.[0]) {
    return { success: true, message: 'User Updated' }
  } else {
    return { success: false, message: 'User Not Updated' }
  }
}

const RemoveUserById = async (id: number) => {
  const result = await User.destroy({
    where: { id }
  })
  if (result) {
    return { success: true, message: 'User Deleted' }
  } else {
    return { success: false, message: 'Error while Deleting User' }
  }
}

export default {
  GetUser,
  GetUserById,
  UpdateUserById,
  RemoveUserById,
}