import { create } from "zustand"

type UserStore = {
  user: null
  setUser: (user: UserStore["user"]) => void
}

export default create<UserStore>(set => ({
  user: null,
  setUser: (user) => set({
    user
  })
}))