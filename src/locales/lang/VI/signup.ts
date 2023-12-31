export const Signup = {
  title: 'Đăng ký',
  form: {
    email: 'Email',
    password: 'Mật khẩu',
    username: 'Tên người dùng',
    confirmPassword: 'Xác nhận mật khẩu',
    placeholderEmail: 'Nhập email',
    placeholderPassword: 'Nhập mật khẩu',
    placeholderUsername: 'Nhập tên người dùng',
    placeholderConfirmPassword: 'Nhập xác nhận mật khẩu',
  },
  button: {
    title: 'Đăng ký',
  },
  validate: {
    email: {
      email: 'Vui lòng nhập một địa chỉ email hợp lệ.',
      required: 'Vui lòng nhập địa chỉ email của bạn.',
    },
    username: {
      min: 'Vui lòng chọn một tên người dùng với ít nhất 4 ký tự.',
      required: 'Vui lòng nhập tên người dùng của bạn.',
    },
    password: {
      min: 'Vui lòng sử dụng mật khẩu chứa ít nhất 8 ký tự.',
      max: 'Vui lòng sử dụng mật khẩu có tối đa 20 ký tự.',
      character: 'Mật khẩu của bạn nên có ít nhất một ký tự chữ cái.',
      number: 'Mật khẩu của bạn nên có ít nhất một ký tự số.',
      required: 'Vui lòng nhập mật khẩu của bạn.',
    },
    confirmPassword: {
      match: 'Xác nhận mật khẩu phải trùng với mật khẩu đã nhập.',
      required: 'Vui lòng nhập xác nhận mật khẩu của bạn.',
    },
  },
  prompt: {
    haveAccount: 'Bạn đã có tài khoản?',
    login: 'Đăng nhập ngay',
  },
};
