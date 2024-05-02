import type { HttpContext } from '@adonisjs/core/http'
import Stream from '#models/stream'

export default class StreamsController {
  async create({ request, response }: HttpContext) {}

  async start({ params, response }: HttpContext) {
    const stream = await Stream.query().where('id', params.id).first()
    if (!stream) {
      return response.notFound({ error: 'Stream not found' })
    }
    await stream.start('')
    return response.ok({ message: 'Stream started' })
  }

  async stop({ params, response }: HttpContext) {
    const { id } = params
    const stream = await Stream.query().where('id', id).first()
    if (!stream) {
      return response.notFound({ error: 'Stream not found' })
    }
    await stream.stop()
    return response.ok({ message: 'Stream stopped' })
  }

  async store({ auth, request, response }: HttpContext) {
    const user = await auth.authenticate()
    const stream = await Stream.create({
      name: request.input('name'),
      pid: 0,
      status: 'inactive',
      startTime: null,
      endTime: null,
      user_id: user.id,
    })
    return response.created(stream)
  }
}