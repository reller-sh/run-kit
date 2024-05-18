import {api} from "./api";

// api.person.all.get({
// }).then(f => {
//     console.log(f.dsds)
// });


// api.permissions.get({
//     query: {
//         search: 'dsd'
//     }
// }).then(r => {
//     return (r?.data?.map(t => {
//         console.log(t.action)
//         return t.id;
//     }));
// });


api.permissions.post({
    json: {
        collection: 'dsd'
    }
}).then(r => {
    if (r?.data) {
        console.log(r.data.id)
        console.log(r.data.action === 'create')
    }
})
