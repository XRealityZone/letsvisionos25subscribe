addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url = new URL(request.url)
  if (url.pathname !== '/subscribe/post') {
    return new Response('Not Found', { status: 404 })
  }

  try {
    const formData = await request.formData()
    const emailValue = formData.get('MERGE0')

    if (!emailValue) {
      return createErrorResponse('需要提供电子邮件地址')
    }

    const domainValue = 'xrworldweeklycn.substack.com'

    const substackResponse = await fetch('https://substackapi.com/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'domain': domainValue,
        'email': emailValue
      })
    })

    if (!substackResponse.ok) {
      const errorData = await substackResponse.json()
      throw new Error(errorData.errors[0] || '订阅失败')
    }

    return createSuccessResponse(emailValue)
  } catch (error) {
    console.error('订阅过程中出错:', error)
    return createErrorResponse(error.message || "发生了意外错误")
  }
}

function createSuccessResponse(email) {
  const response = {
    "id": "subscriber_" + Math.random().toString(36).substr(2, 9),
    "email_address": email,
    "unique_email_id": "unique_" + Math.random().toString(36).substr(2, 9),
    "email_type": "html",
    "status": "subscribed",
    "merge_fields": {
      "FNAME": "",
      "LNAME": "",
    },
    "stats": {
      "avg_open_rate": 0,
      "avg_click_rate": 0
    },
    "ip_signup": "",
    "timestamp_signup": new Date().toISOString(),
    "ip_opt": "0.0.0.0",
    "timestamp_opt": new Date().toISOString(),
    "member_rating": 2,
    "last_changed": new Date().toISOString(),
    "language": "zh",
    "vip": false,
    "email_client": "",
    "location": {
      "latitude": 0,
      "longitude": 0,
      "gmtoff": 0,
      "dstoff": 0,
      "country_code": "",
      "timezone": ""
    },
    "list_id": "your_list_id",
    "_links": [
      {
        "rel": "self",
        "href": "https://us20.api.mailchimp.com/3.0/lists/list_id/members/subscriber_id",
        "method": "GET",
        "targetSchema": "https://us20.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json"
      }
    ]
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

function createErrorResponse(errorMessage) {
  const response = {
    "type": "http://developer.mailchimp.com/documentation/mailchimp/guides/error-glossary/",
    "title": "Invalid Resource",
    "status": 400,
    "detail": errorMessage,
    "instance": "",
    "errors": [
      {
        "field": "email_address",
        "message": "请提供有效的电子邮件地址。"
      }
    ]
  }

  return new Response(JSON.stringify(response), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  })
}