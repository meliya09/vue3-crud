<script setup>
    //import ref
    import { ref } from "vue";

    //import router
    import { useRouter } from 'vue-router';

    //import api
    import api from "../../api";

    //init router
    const router = useRouter();

    //define state
    const id = ref("");
    const course = ref("");
    const mentor = ref("");
    const title = ref([]);

    //method "storePost"
    const storePost = async () => {

        //init formData
        let formData = new FormData();

        //assign state value to formData
        formData.append("id", id.value);
        formData.append("course", course.value);
        formData.append("mentor", mentor.value);
        formData.append("title", title.value);

        //store data with API
        await api.post('/api/courses', formData)
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
                        <form @submit.prevent="storePost()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Course</label>
                                <input type="text" class="form-control" v-model="course.value" placeholder="Course Post">
                                <div v-if="errors.course" class="alert alert-danger mt-2">
                                    <span>{{ errors.course[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Mentor</label>
                                <textarea class="form-control" v-model="mentor.value" rows="5" placeholder="Mentor Post"></textarea>
                                <div v-if="errors.mentor" class="alert alert-danger mt-2">
                                    <span>{{ errors.mentor[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Title</label>
                                <textarea class="form-control" v-model="title.value" rows="5" placeholder="Title Post"></textarea>
                                <div v-if="errors.title" class="alert alert-danger mt-2">
                                    <span>{{ errors.title[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
