<template>
  <v-container fluid fill-height>
    <InfoPerson 
      :personId="cardPerson"
    />
    <CategoryPerson 
      :personSelectAdds="personAdds"
    />
  </v-container>
</template>

<script>

export default {
  props: ['cardPerson', 'personAdds'],
  data() {
    return {
      Object: true,
      Array: true,
    };
  },
}
</script>