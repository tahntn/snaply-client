export const Login = {
  title: 'Đăng nhập',
  form: {
    email: 'Email',
    password: 'Mật khẩu',
    placeholderEmail: 'Nhập email ',
    placeholderPassword: 'Nhập mật khẩu',
  },
  button: {
    title: 'Đăng nhập',
  },
  validate: {
    email: {
      email: 'Vui lòng nhập một địa chỉ email hợp lệ.',
      required: 'Vui lòng nhập địa chỉ email của bạn.',
    },
    password: {
      min: 'Vui lòng sử dụng mật khẩu chứa ít nhất 8 ký tự.',
      max: 'Vui lòng sử dụng mật khẩu có tối đa 20 ký tự.',
      character: 'Mật khẩu của bạn nên có ít nhất một ký tự chữ cái.',
      number: 'Mật khẩu của bạn nên có ít nhất một ký tự số.',
      required: 'Vui lòng nhập mật khẩu của bạn.',
    },
  },
  prompt: {
    noAccount: 'Không có tài khoản?',
    signup: 'Đăng ký ngay',
  },
};
