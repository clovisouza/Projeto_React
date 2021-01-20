import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { Authentication, AuthenticationParams } from "@/domain/usecases/authentication";
import { AccountModel } from "@/models/account-model";


export class RemoteAuthentication implements Authentication{
    constructor(
        private readonly url:string,
        private readonly httpPostClient:HttpPostClient<AuthenticationParams,AccountModel>
        ){}
    
    async auth(params:AuthenticationParams):Promise<AccountModel>{
      const HttpResponse =  await this.httpPostClient.post({
           url: this.url,
           body:params
        })

        switch(HttpResponse.statusCode){
            case HttpStatusCode.ok:return HttpResponse.body
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
}