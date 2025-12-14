import { gql } from "@/__generated__";

// export const SEND_RESET_PASSWORD_EMAIL = gql(`
//   #graphql
//   mutation SendResetPasswordEmail($email:String!) {
//     sendResetPasswordEmail(email: $email)  
//   }
// `);

// export const SEND_VERIFICATION_EMAIL = gql(`
//   #graphql
//   mutation SendVerificationEmail {
//     sendVerificationEmail
//   }
// `);

export const RESET_PASSWORD = gql(`
  #graphql
  mutation ResetPassword($newPassword:String!, $token:String!) {
    resetPassword(newPassword: $newPassword, token:$token)  
  }
`);

