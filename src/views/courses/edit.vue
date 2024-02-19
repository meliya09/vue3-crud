<script setup>
    //import ref
    import { ref, onMounted } from "vue";

    //import router
    import { useRouter, useRoute } from 'vue-router';

    //import api
    import api from "../../api";

    //init router
    const router = useRouter();

    //init route
    const route = useRoute();
    
    //define state
    const id = ref("");
    const course = ref("");
    const mentor = ref("");
    const title = ref([]);


    //onMounted
    onMounted( async () => {

        //fetch detail data post by ID
        await api.get(`/api/courses/${route.params.id}`)
        .then(response => {
            
            //set response data to state
            course.value = response.data.data.course
            mentor.value = response.data.data.mentor
            title.value = response.data.data.title
        });
    })

    //method "updatePost"
    const updatePost = async () => {

        //init formData
        let formData = new FormData();

        //assign state value to formData
        formData.append("id", id.value);
        formData.append("course", course.value);
        formData.append("mentor", mentor.value);
        formData.append("title", title.value);

        //store data with API
        await api.post(`/api/courses/${route.params.id}`, formData)
        .then(() => {
            //redirect
            router.push({ path: "/courses" });
        })
        .catch((error) => {
            //assign response error data to state "errors"
            errors.value = error.response.data;
        });
    };
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="updatePost()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Course</label>
                                <input type="text" class="form-control" v-model="course" placeholder="Course Post">
                                <div v-if="errors.course" class="alert alert-danger mt-2">
                                    <span>{{ errors.course[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Mentor</label>
                                <textarea class="form-control" v-model="mentor" rows="5" placeholder="Mentor Post"></textarea>
                                <div v-if="errors.mentor" class="alert alert-danger mt-2">
                                    <span>{{ errors.mentor[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Title</label>
                                <textarea class="form-control" v-model="title" rows="5" placeholder="Title Post"></textarea>
                                <div v-if="errors.title" class="alert alert-danger mt-2">
                                    <span>{{ errors.title[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>