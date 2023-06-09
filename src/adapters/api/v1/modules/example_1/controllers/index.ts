import ExampleOneService from "@/domain/example1/services";

class ExampleOneController {
    private service: ExampleOneService

    constructor(){
        this.service = new ExampleOneService()
    }

    create =  () => {
        const data = this.service.create()
        return {message: 'Ping'}
    }
}

export default ExampleOneController