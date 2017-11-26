import { sign } from 'jsonwebtoken';

export default function createToken(message, data, context) {
  return context === 'decide' ? {} : {
    token: sign({
      type: 'user',
      id: data.user.user_id
    }, 'secret')
  };
}
