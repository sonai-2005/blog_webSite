import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage()
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {

        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("create-post error :: " + error);
        }
    }
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
            console.log("update post error ::" + error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("error in delete Post:: " + error);
            return false;
        }

    }
    async getPost(){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("error in get post :: "+error);
        }
    }
    //for all the posts through the query
    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                // [Query.equal("status" , "active")] the same thing saved in queries
                queries,
            )
        } catch (error) {
            console.log("error in the get posts :: "+error);
            return false;
        }
    }
    // file upload
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("error uploading file ::"+error);
            return false;
        }
    }
    //delete file
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("error deleting file:: "+error);
            return false;
        }
    }
    //preview file
    async filePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("error  previewing the file:: "+error);

        }
    }
}

const service = new Service();
export default service