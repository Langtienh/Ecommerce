import { HttpException, HttpStatus } from '@nestjs/common'

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, constraints?: any) {
    super(
      {
        message,
        constraints,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Unprocessable Entity'
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    )
  }
}
