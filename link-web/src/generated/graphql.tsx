import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me: UserResponse;
  users: Array<User>;
  emailExists: UserResponse;
  usernameExists: UserResponse;
  user?: Maybe<User>;
};


export type QueryEmailExistsArgs = {
  email: Scalars['String'];
};


export type QueryUsernameExistsArgs = {
  username: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<UserError>;
  user?: Maybe<User>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  code: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser?: Maybe<UserResponse>;
  login: UserResponse;
  updateUser: User;
  deleteUser: Scalars['Boolean'];
};


export type MutationRegisterUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser?: Maybe<(
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'id' | 'username' | 'updated_at'>
    )>, error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'code'>
    )> }
  )> }
);

export type CheckEmailExistsQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type CheckEmailExistsQuery = (
  { __typename?: 'Query' }
  & { emailExists: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'exists'>
  ) }
);

export type CheckUsernameExistsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type CheckUsernameExistsQuery = (
  { __typename?: 'Query' }
  & { usernameExists: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'exists'>
  ) }
);


export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  registerUser(email: $email, username: $username, password: $password) {
    user {
      email
      id
      username
      updated_at
    }
    error {
      message
      code
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CheckEmailExistsDocument = gql`
    query checkEmailExists($email: String!) {
  emailExists(email: $email) {
    exists
  }
}
    `;

export function useCheckEmailExistsQuery(options: Omit<Urql.UseQueryArgs<CheckEmailExistsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CheckEmailExistsQuery>({ query: CheckEmailExistsDocument, ...options });
};
export const CheckUsernameExistsDocument = gql`
    query checkUsernameExists($username: String!) {
  usernameExists(username: $username) {
    exists
  }
}
    `;

export function useCheckUsernameExistsQuery(options: Omit<Urql.UseQueryArgs<CheckUsernameExistsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CheckUsernameExistsQuery>({ query: CheckUsernameExistsDocument, ...options });
};