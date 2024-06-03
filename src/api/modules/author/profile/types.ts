export interface FormAuthorData
{
    create_by_user_id: number
    author_name: string
    avatar?: File
}

export interface AuthorData extends FormAuthorData
{
   id: number
}

export interface DetailAuthorResponse
{
    code: number
    message: string
    data: AuthorData
}
