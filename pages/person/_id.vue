<template>
  <v-container fluid fill-height>
    <CardPerson 
      :cardPerson="add_item" 
      :personAdds="person_adds" 
      />
  </v-container>
</template>

<script>
import { motoAdds, partsAdds, serviceAdds, eventsAdds } from "@/static/data.js";

export default {
  data() {
    return {
      add_item: [],
      person_adds: [],
    };
  },
  created() {
    const data = [...motoAdds, ...partsAdds, ...serviceAdds, ...eventsAdds];

    let current = data.filter((item) => item.id == this.$route.params.id);
    console.log("current - " + JSON.stringify(current));

    this.add_item = current ? current[0] : {};
    console.log("add_item - " + JSON.stringify(this.add_item));

    this.person_adds = [];
    if (this.add_item) {
      this.person_adds = data.filter((item) => item.user == this.add_item.user);
    } else {
      this.person_adds = [];
    }
    console.log("person_adds - " + JSON.stringify(this.person_adds));
  },
};
</script>
