const getters = {
  sidebar: state => state.app.sidebar,
  bread: state => state.app.bread,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  language: state => state.app.language,
  editlang: state => state.app.editlang,
  shoppingMallId: state => state.app.shoppingMallId,
  themeColor: state => state.app.themeColor,
  status: state => state.status
}
export default getters
