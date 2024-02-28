class userDtos {
  id;
  name;
  email;
  mobile;
  userType;
  interest;
  isVerified;

  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.mobile = user.mobile;
    this.userType = user.userType;
    this.interest = user.interest;
    this.isVerified = user.isVerified;
  }
}

export default userDtos

/* 
{
  _id: new ObjectId('656d44b9f6ba0ea3f87a5843'),
  name: 'bhomik',
  email: 'bhomickyadav786@gmail.com',
  mobile: '6396604215',
  password: '$2b$04$5ZzWYEz52X7F1aGpzkUuQekOtFpifWCMiPcboxPwfhuom/rVi8lCu',
  userType: 'STUDENT',
  interest: [ 'coding' ],
  isVerified: true,
  createdAt: 2023-12-04T03:17:13.775Z,
  updatedAt: 2023-12-04T03:18:14.214Z,
  __v: 0
}


*/
