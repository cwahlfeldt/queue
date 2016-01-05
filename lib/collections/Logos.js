let logoStore = new FS.Store.GridFS('logos');

Logos = new FS.Collection('logos', {
    stores: [logoStore]
});

if (Meteor.isServer) {
    Logos.allow({
        insert: () => {
            return true;
        },
        update: () => {
            return true;
        },
        download: () => {
            return true;
        },
        remove: () => {
            return true;
        }
    });
}
