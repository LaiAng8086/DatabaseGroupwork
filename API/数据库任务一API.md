# 数据库任务一API文档

## 基本数据格式（参考OO后端）

该后端的接口格式一般情况下遵循相对统一的标准，采用JSON格式。数据结构大致如下：

* **success** `Boolean`格式，表示是否操作成功。
* **code** `Integer`格式，表示错误代码。
  * 当**success**为`true`时，一般错误代码为`0`
  * 当**success**为`false`时，错误代码为非零（一般大于零，少数情况下为负数）
* **message** `String`格式或者`null`，表示消息。
* **data** `Object`格式或者`null`，表示传递的数据信息。

例如：

```json
{
    "success": true,
    "code": 0,
    "message": "This is message!",
    "data": {
        "data": "This is data!"
    }
}
```

## 用户操作

### 用户注册 -/user/register

- 请求路径 `/user/register`
- 请求方法
  - `name`，String格式，用户名
  - `password`，String格式，密码
  - `avatar`，String路径，用户头像图床链接
- 返回数据格式
  - `user_id`，Integer格式，用户id
- 可能出现的报错
  - 用户名已存在

### 用户登录 -/user/login

- 请求路径 `/user/login`
- 请求方法 `POST`
- 请求数据格式
  - `name`，String格式，用户名
  - `password`，String格式，密码
- 返回结果
  - `user_id`，Integer格式，用户id
- 异常情况
  - 无此用户
  - 密码错误

### 用户登出 -/user/logout

- 请求路径 `/user/logout`
- 请求方法 `POST`
- 返回是否成功登出的Message，data=null

## 标签操作

### 获得所有标签 -/tags

- 请求路径 `/tags`
- 请求方法 `GET`
- 返回结果格式
  - `tags`，Array类型，表示现在系统中的所有标签

## 文章操作

### 创建新文章 - /article

- 请求路径 `/article`
- 请求方法 `POST`
- 请求参数
  - `title`， String格式，文章的标题
  - `author`， String格式，文章的作者
  - `content`， String格式，文章的内容（`Markdown`格式）
- 返回结果格式（SUCCESS）
  - `id`， String格式，文章的编号
- 返回结果格式（ARTICLE_CREATE_FAILED）
  - 错误信息，可能设计为key是发生错误的字段，value为数组。。。？
- 可能出现的异常
  - TODO

### 获取文章列表 -/articles

- 请求路径 `/articles`
- 请求方法 `GET` 
- 请求参数格式
  - `page`， Integer格式，表示文章列表的页码（默认为1，从1开始编号）
  - `per_page`，Integer格式，表示每页显示文章的数量（默认为10，可以缺省）
  - `tag_id`，String 格式，表示含有指定标签的文章的筛选
- 返回结果格式
  - `total_count`，Integer格式，该请求涉及的文章篇数
  - `total_page`，Integer格式，该请求涉及的列表页数
  - `page`，Integer格式，当前页码
  - `per_page`，Integer格式，每页文章篇数
  - `articles`，Array格式，每一个元素相当于一篇文章
    - `id`，String格式，文章的ID号
    - `title`，String格式，文章的标题
    - `author`，String格式，文章的作者
    - `avatar`，String格式，文章作者头像的图床链接
    - `summary`，String格式，文章的缩略内容（不超过30个字符）
    - `pros`，Integer格式，文章的点赞数
    - `create_time`，String格式，文章发表时间

### 获取完整文章的信息 -/article/:id

- 请求路径 `/article/:id`
- 请求方法 `GET`
- 请求参数
  - `id`，String格式，表示文章的ID
  - `user_id`，String格式，用户的ID
- 返回结果格式
  - `id`，String格式，表示文章的编号
  - `title`，String格式，表示文章的标题
  - `content`，String格式，表示文章的内容（`Markdown`源码）
  - `tags`，Array格式，标签组(包含涉及的所有标签名-热度值的键值对，可以供前端排序，也可以考虑按热度排序后传出)
  - `pros`，Integer格式，点赞数
  - `create_time`，String格式，文章发表时间
  - `comments`，Array格式，该文章的所有评论
    - `id`，String格式，表示本条评论的id
    - `user`，String格式，表示本条评论的用户名
    - `avatar`，String格式，表示本条评论用户头像的图床链接
    - `content`，String格式，表示本条评论的内容
    - `create_time`，String格式，表示创建本条评论的时间
    - `pros`，Integer格式，表示本条评论当前获得的点赞数

### 文章删除 -/article/:id/

- 请求路径 `/article/:id`
- 请求方法 `DELETE`
- 请求参数
  - `id`，String格式，表示该评论自身的id值
- 错误返回 TODO

> 可以考虑确认。

### 文章点赞 -/article/:id/pro

- 请求路径 `/article/:id/pro`
- 请求方法 `POST`
- 请求参数
  - `id`，String格式，表示该评论自身的id值
  - `user_id`，String格式，表示点赞者的用户id（防止重复点赞）

- 错误返回 TODO

## 评论操作

### 发表评论 -/article/:id/comment

- 请求路径 `/article/:id/comment`
- 请求方法 `POST`
- 请求参数
  - `user`，String格式，发表评论的用户id
  - `content`，String格式，表示评论的信息
- 正常返回结果
  - `id`，所发表的这条评论的id
- 错误返回
  - TODO

> 请求路径中的id是该评论所属文章的id
>
> 相当于评论的创建时间、评论id和文章id，点赞数的初始化均是由后端完成的。

### 评论点赞 -/comment/:id/pro

- 请求路径 `/comment/:id/pro`
- 请求方法 `POST`
- 请求参数
  - `id`，Integer格式，表示该评论自身的id值
  - `user_id`，Integer格式，表示点赞者的用户id（防止重复点赞）
  
- 错误返回 TODO

### 评论取消赞 -/comment/:id/pro

- 请求路径 `/comment/:id/pro`
- 请求方法 `DELETE`
- 请求参数
  - `id`，Integer格式，表示该评论自身的id值
  - `user_id`，Integer格式，表示点赞者的用户id（点过赞才能撤回？）
- 错误返回 TODO

### 评论删除 -/comment/:id/

- 请求路径 `/comment/:id`
- 请求方法 `DELETE`
- 请求参数
  - `id`，Integer格式，表示该评论自身的id值
- 错误返回 TODO

> 可以考虑确认。

## 参考效果

后端执行代码

```ruby
render status: 200, json: response_json(
      true,
      message: "Success",
      data: {
        total_count: total_count,
        total_page: total_page,
        page: page,
        per_page: per_page,
        posts: _posts
      }
    )
```

实际浏览器得到

```json
{
    "success": true,
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 19,
        "total_page": 1,
        "page": 1,
        "per_page": 20,
        "posts": [
            {
                "id": 1145,
                "title": "【问题反馈】官方投喂包问题反馈专用帖",
                "thumb": "类似上一单元作业，大家可以在本帖提出对官方投喂包的疑问，我们...",
                "pre_information": "yes",
                "status": "open",
                "category": "free_discuss",
                "priority": "top",
                "follow_count": 8,
                "self_follow": false,
                "created_at": "2022-03-28 19:07:32",
                "user_id": 2043,
                "user_name": "刘博一",
                "user_email": "19373427@buaa.edu.cn"
            }
        ]
    }
}
```



