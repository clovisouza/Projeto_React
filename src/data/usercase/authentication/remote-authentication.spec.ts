import { HttpPostClient } from "data/protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";


describe('RemoteAuthentication', ()=> {
    test('Should Call HttpClient With correct URL',async () => {
        class HttpPostClientSpy implements HttpPostClient{
            url?:string
            async post (url:string):Promise<void>{
                this.url = url
                return Promise.resolve()
            }
        }
        const url ='any_url'
        const httpPostClient = new HttpPostClientSpy() 
        const sut = new RemoteAuthentication(url,httpPostClient)
        await sut.auth()
        expect(httpPostClient.url).toBe(url) 

    });
  
  });