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
  link?: Maybe<Link>;
  success?: Maybe<Success>;
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
  links: Array<Link>;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['Int'];
  url: Scalars['String'];
  icon: Scalars['String'];
  title: Scalars['String'];
  num_clicks: Scalars['Float'];
  num_views: Scalars['Float'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Success = {
  __typename?: 'Success';
  message: Scalars['String'];
  code: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser?: Maybe<UserResponse>;
  login: UserResponse;
  logout: UserResponse;
  addLink: UserResponse;
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
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};


export type MutationAddLinkArgs = {
  icon?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};

export type LoginMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'code'>
    )> }
  ) }
);

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

export type EmailExistsQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type EmailExistsQuery = (
  { __typename?: 'Query' }
  & { emailExists: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'exists'>
    & { error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'code'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
      & { links: Array<(
        { __typename?: 'Link' }
        & Pick<Link, 'url' | 'icon' | 'title'>
      )> }
    )>, error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'code'>
    )> }
  ) }
);

export type UsernameExistsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UsernameExistsQuery = (
  { __typename?: 'Query' }
  & { usernameExists: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'exists'>
    & { error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'code'>
    )> }
  ) }
);


export const LoginDocument = gql`
    mutation Login($username: String, $password: String!) {
  login(username: $username, password: $password) {
    user {
      id
    }
    error {
      message
      code
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
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
export const EmailExistsDocument = gql`
    query emailExists($email: String!) {
  emailExists(email: $email) {
    exists
    error {
      message
      code
    }
  }
}
    `;

export function useEmailExistsQuery(options: Omit<Urql.UseQueryArgs<EmailExistsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EmailExistsQuery>({ query: EmailExistsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    user {
      username
      links {
        url
        icon
        title
      }
    }
    error {
      message
      code
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const UsernameExistsDocument = gql`
    query usernameExists($username: String!) {
  usernameExists(username: $username) {
    exists
    error {
      message
      code
    }
  }
}
    `;

export function useUsernameExistsQuery(options: Omit<Urql.UseQueryArgs<UsernameExistsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsernameExistsQuery>({ query: UsernameExistsDocument, ...options });
};