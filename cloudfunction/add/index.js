// 云函数入口文件
const cloud = require('wx-server-sdk')

// 与小程序端一致，均需调用 init 方法初始化
cloud.init()
// 可在入口函数外缓存 db 对象
const db = cloud.database()

// 数据库查询更新指令对象
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {

  // 以 openid 作为记录 id
  const docId = `${event.userInfo.openId}`

  let userRecord

  try {
    const querResult = await db.collection('User').doc(docId).get()
    userRecord = querResult.data
  } catch (err) {
    // 用户第一次上传分数
  }

  if (userRecord) {
    // 更新用户分数

    const maxScore = event.score
    if (userRecord.score > event.score) {
      maxScore = userRecord.score
    }


    const updateResult = await db.collection('User').doc(docId).update({
      data: {
        score: maxScore,


      }
    })

    if (updateResult.stats.updated === 0) {
      // 没有更新成功，更新数为 0
      return {
        success: false
      }
    }

    return {
      success: true,
      updated: true
    }

  } else {
    // 创建新的用户记录
    await db.collection('User').add({
      // data 是将要被插入到 score 集合的 JSON 对象
      data: {
        // 这里指定了 _id，如果不指定，数据库会默认生成一个
        _id: docId,
        // 这里指定了 _openid，因在云函数端创建的记录不会默认插入用户 openid，如果是在小程序端创建的记录，会默认插入 _openid 字段
        // 分数历史
        score: [event.score],
      }
    })

    return {
      success: true,
      created: true,
    }
  }
}