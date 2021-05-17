<template>
  <div class="note-wrapper" @click="show($event)">
    <v-col
      cols="12"
      md="12"
      class="pa-1 d-flex align-center justify-center flex-column"
    >
      <v-card class="pa-4" style="width: 50%">
        <form @submit.prevent="addNote">
          <v-text-field
            :label="$t('Note title')"
            :placeholder="$t('Enter the title')"
            outlined
            color="primary"
            v-model.trim="noteTitle"
            v-if="fieldShow"
          ></v-text-field>
          <v-textarea
            rows="2"
            name="input-7-4"
            :label="$t('Note description')"
            required
            :rules="rulesNoteDescriptionInput"
            v-model.trim="noteDescription"
            @click="fieldShow = true"
          ></v-textarea>

          <v-btn
            color="secondary color_black"
            block
            type="submit"
            :disabled="this.$v.$invalid"
          >
            {{ $t("Set") }}
          </v-btn>
        </form>
      </v-card>
      <draggable
        style="width: 50%"
        :list="notes"
        :disabled="!enabled"
        class="list-group mt-3"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div
          class="list-group-item"
          v-for="(note, noteIndex) of notes"
          :key="noteIndex"
        >
          <v-card v-if="note._title" class="mt-1">
            <div class="d-flex justify-space-between">
              <v-card-title class="py-1">{{ note._title }}</v-card-title>
              <v-card-actions class="d-flex align-center mx-4">
                <v-icon
                  class="pointer"
                  @click="pinNote(note, noteIndex)"
                  v-if="note._pin == false"
                  >mdi-pin-outline</v-icon
                >
                <v-icon
                  class="pointer"
                  @click="pinNote(note, noteIndex)"
                  v-if="note._pin == true"
                  >mdi-pin</v-icon
                >
              </v-card-actions>
            </div>
            <v-card-text>{{ note._description }}</v-card-text>
          </v-card>
          <v-card
            v-else-if="note._description"
            class="mt-1 px-4 pt-2 pb-3 d-flex flex-column"
          >
            <v-card-actions class="d-flex align-center justify-end pt-0">
              <v-icon
                class="pointer"
                @click="pinNote(note, noteIndex)"
                v-if="note._pin == false"
                >mdi-pin-outline</v-icon
              >
              <v-icon
                class="pointer"
                @click="pinNote(note, noteIndex)"
                v-if="note._pin == true"
                >mdi-pin</v-icon
              >
            </v-card-actions>
            <v-card-text class="pa-0">{{ note._description }}</v-card-text>
          </v-card>
          <div v-else>There are no notes</div>
        </div>
      </draggable>
      <span class="d-none">{{ notesGet }}</span>
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ValidationEvaluation, ValidationProperties } from "vue/types/vue";
import { Validation, validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
import Note from "@/store/modules/Note";
import INote from "@/store/interfaces/INote";
import draggable from "vuedraggable";

@Component({
  name: "Login",
  mixins: [validationMixin],
  validations: {
    noteDescription: { required },
  },
  components: {
    draggable,
  },
  data() {
    return {
      dragging: false,
      enabled: true,
      fieldShow: false,
      noteTitle: "",
      noteDescription: "",
    };
  },
})
export default class Login extends Vue {
  private store: MyStore = useStore(this.$store);
  private noteTitle: string = "";
  private noteDescription: string = "";
  private pin: boolean = false;
  private notes: INote[] = [];

  private get rulesNoteDescriptionInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.noteDescription.$dirty && this.$v.noteDescription.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }
  private checkMove(e: any) {
    window.console.log("Future index: ", e.draggedContext);
    console.log(this.notes);
  }

  public get notesGet(): INote[] {
    this.saveChanges(this.notes);
    return this.notes;
  }

  private saveChanges(notes: INote[]) {
    localStorage.note = JSON.stringify(notes);
  }

  private show(e: any) {
    if (
      e.target.classList.value.includes(
        "pa-1 d-flex align-center justify-center flex-column"
      ) == true
    )
      this.$data.fieldShow = false;
  }

  private pinNote(note: any, noteIndex: number) {
    const pinNotesToLocalStorage = JSON.parse(localStorage.note).map(
      (item: any, itemIndex: number) => {
        if (noteIndex === itemIndex)
          item._pin == false ? (item._pin = true) : (item._pin = false);
        return item;
      }
    );
    localStorage.note = JSON.stringify(pinNotesToLocalStorage);
    this.notes = this.store.note.getLocal();
  }

  private addNote() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      if (localStorage.isAuthOrganizer == "true") {
        console.log("success registered");
      }
      const note: INote = new Note(
        this.noteTitle,
        this.noteDescription,
        this.pin
      );
      this.store.note.saveLocal(note);
      this.$data.noteTitle = "";
      this.$data.noteDescription = "";
      this.notes = this.store.note.getLocal();
    } else if (this.$v.$invalid) {
      console.log("not success");
    }
  }
  created() {
    this.$v.$touch();
    this.notes = this.store.note.getLocal();
  }
}
</script>

<style lang="scss" scoped>
.note-wrapper {
  align-self: flex-start;
  display: flex;
  width: 100%;
}
.email-forgot {
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: 0.5s;
  text-align: center;
  &:hover {
    text-decoration-color: $primary;
  }
}
</style>
