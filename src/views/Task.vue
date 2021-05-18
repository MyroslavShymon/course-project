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
        <div class="mt-2">
          <v-btn color="secondary color_black" @click="sortByPriority">
            Sort by priorty
          </v-btn>
        </div>
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
              <v-card-actions class="d-flex align-center mx-4"
                >{{
                  note._priority === 1
                    ? "Low"
                    : note._priority === 2
                    ? "Medium"
                    : "High"
                }}
                <v-radio-group v-model="radioGroup" class="ml-2">
                  <div class="v-radio-group-inner d-flex">
                    <v-radio
                      v-for="n in 3"
                      :key="n"
                      :value="`${noteIndex}` + `${n}`"
                      class="ma-0"
                      :name="`noteIndex${noteIndex}`"
                      :color="n === 1 ? 'green' : n === 2 ? 'yellow' : 'red'"
                      @click="priorityNote(note, noteIndex, n)"
                    ></v-radio>
                  </div>
                </v-radio-group>
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
            <v-card-text>{{ note._description }} </v-card-text>
          </v-card>
          <v-card
            v-else-if="note._description"
            class="mt-1 px-4 pt-2 pb-3 d-flex flex-column"
          >
            <v-card-actions class="d-flex align-center justify-end pt-0">
              {{
                note._priority === 1
                  ? "Low"
                  : note._priority === 2
                  ? "Medium"
                  : "High"
              }}
              <v-radio-group v-model="radioGroup" class="ml-2">
                <div class="v-radio-group-inner d-flex">
                  <v-radio
                    v-for="n in 3"
                    :key="n"
                    :value="`${noteIndex}` + `${n}`"
                    :name="`noteIndex${noteIndex}`"
                    :color="n === 1 ? 'green' : n === 2 ? 'yellow' : 'red'"
                    class="ma-0"
                    @click="priorityNote(note, noteIndex, n)"
                  ></v-radio>
                </div>
              </v-radio-group>
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
            <v-card-text class="pa-0">{{ note._description }} </v-card-text>
          </v-card>
          <div v-else>There are no notes</div>
        </div>
      </draggable>
      <span class="d-none">{{ notesGet }}</span>
      <span class="d-none">{{ notesPriorityGet }}</span>
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
  private priority: number = 1;
  private notes: INote[] = [];
  private radioGroup: string = "";

  private get rulesNoteDescriptionInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.noteDescription.$dirty && this.$v.noteDescription.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }

  private sortByPriority() {
    this.notes = this.store.note.sortByPriority();
  }

  private checkMove(e: any) {
    window.console.log("Future index: ", e.draggedContext);
    console.log(this.notes);
  }

  public get notesGet(): INote[] {
    this.saveChanges(this.notes);
    return this.notes;
  }

  public get notesPriorityGet(): string {
    return this.radioGroup;
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

  private priorityNote(note: any, noteIndex: number, n: number) {
    const priorityNotesToLocalStorage = JSON.parse(localStorage.note).map(
      (item: any, itemIndex: number) => {
        if (noteIndex === itemIndex) item._priority = n;
        return item;
      }
    );

    localStorage.note = JSON.stringify(priorityNotesToLocalStorage);
    this.notes = this.store.note.getNotes();
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
        this.pin,
        this.priority
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
