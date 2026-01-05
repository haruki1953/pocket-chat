/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3607937828")

  // update collection data
  unmarshal({
    "createRule": "// 创建时需登录\n@request.auth.id != \"\" &&\n// 创建时需为创建者（传入的author需为当前用户）\n@request.auth.id = @request.body.author",
    "listRule": "// 用户已登录，可以查看\n@request.auth.id != \"\" ||\n// 根据config，判断是否允许未登录用户查看\n(\n  @collection.config.key ?= 'allow-anonymous-view' &&\n  @collection.config.value ?= true\n)",
    "updateRule": "// 修改需登录\n@request.auth.id != \"\" &&\n// 修改需为创建者\n@request.auth.id = author.id &&\n// 禁止修改author\n@request.body.author:isset = false",
    "viewRule": "// 用户已登录，可以查看\n@request.auth.id != \"\" ||\n// 根据config，判断是否允许未登录用户查看\n(\n  @collection.config.key ?= 'allow-anonymous-view' &&\n  @collection.config.value ?= true\n)"
  }, collection)

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "bool2382110195",
    "name": "isDeleted",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3607937828")

  // update collection data
  unmarshal({
    "createRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  // remove field
  collection.fields.removeById("bool2382110195")

  return app.save(collection)
})
