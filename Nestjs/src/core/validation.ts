import { ArgumentMetadata, Injectable, ValidationError, ValidationPipe } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { UnprocessableEntityException } from './unprocessable-entity.exception'

interface CustomMessage {
  [property: string]: string
}

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor(props) {
    super(props)
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    // Kiểm tra nếu metatype không hợp lệ, trả về giá trị ban đầu
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value
    }

    // Chuyển đổi dữ liệu từ plain object sang class object
    const object = plainToClass(metadata.metatype, value)

    // Validate dữ liệu đã được chuyển đổi
    const errors = await validate(object)

    // Nếu có lỗi, ném ra ngoại lệ với các lỗi đã format
    if (errors.length > 0) {
      const constants = this.formatErrors(errors)
      throw new UnprocessableEntityException('Validation failed!', constants)
    }

    // Trả về dữ liệu đã được chuyển đổi thay vì giá trị ban đầu
    return object
  }

  protected toValidate(metatype: any): boolean {
    const types: (new (...args: any[]) => any)[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }

  private formatErrors(errors: ValidationError[]): CustomMessage {
    const result: CustomMessage = {}
    errors.forEach((err) => {
      result[err.property] = Object.values(err.constraints)[0]
    })
    return result
  }
}
