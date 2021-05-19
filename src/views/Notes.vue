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
          <div class="d-flex">
            <v-textarea
              rows="1"
              name="input-7-4"
              :label="$t('Note description')"
              required
              :rules="rulesNoteDescriptionInput"
              v-model.trim="noteDescription"
              @click="fieldShow = true"
            ></v-textarea>
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="pa-2"
                  style="width: 25px; height: 25px"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-dots-vertical</v-icon
                >
              </template>
              <v-list>
                <v-list-item @click="sortByGroupName" class="pointer">
                  <v-list-item-title>{{
                    $t("Sort by group name")
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="groupWrapper = true" class="pointer">
                  <v-list-item-title>{{ $t("Add group") }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="mt-2" v-if="fieldShow">
            <v-select
              :items="groupNames"
              :label="$t('Group names')"
              outlined
              v-model="groupNameSelected"
            ></v-select>
          </div>
          <v-row cols="12" v-if="fieldShow">
            <v-col md="12" v-if="groupWrapper">
              <v-row>
                <v-col md="7" class="d-flex justify-center align-center">
                  <v-text-field
                    :label="$t('Group name')"
                    :placeholder="$t('Enter the name')"
                    color="primary"
                    v-model.trim="groupName"
                    @keyup.enter="addGroupName"
                  ></v-text-field>
                </v-col>
                <v-col md="5" class="d-flex justify-end align-center">
                  <div class="d-flex" style="width: 100%">
                    <v-btn color="secondary color_black" @click="addGroupName">
                      {{ $t("Add group name") }}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-btn
            color="secondary color_black"
            block
            type="submit"
            v-if="fieldShow"
            :disabled="this.$v.$invalid"
            class="mt-2"
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
          <v-card v-if="note._group" class="mt-1">
            <div class="d-flex justify-space-between">
              <v-card-title class="py-1"
                >{{ note._title }} {{ $t("Group name")
                }}{{ `: ${note._group}` }}</v-card-title
              >
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
            <div class="d-flex align-center">
              <v-card-text>{{ note._description }} </v-card-text>
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mx-6 pa-2"
                    style="width: 25px; height: 25px"
                    v-bind="attrs"
                    v-on="on"
                    >mdi-dots-vertical</v-icon
                  >
                </template>
                <v-list>
                  <v-list-item @click="deleteNote(note)" class="pointer">
                    <v-list-item-title>{{
                      $t("Delete note")
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card>
          <v-card v-else-if="note._group == ''" class="mt-1">
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
            <div class="d-flex align-center">
              <v-card-text>{{ note._description }} </v-card-text>
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mx-6 pa-2"
                    style="width: 25px; height: 25px"
                    v-bind="attrs"
                    v-on="on"
                    >mdi-dots-vertical</v-icon
                  >
                </template>
                <v-list>
                  <v-list-item @click="deleteNote(note)" class="pointer">
                    <v-list-item-title>{{
                      $t("Delete note")
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
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
            <div class="d-flex align-center">
              <v-card-text>{{ note._description }} </v-card-text>
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    style="width: 25px; height: 25px"
                    class="mx-6 pa-2"
                    v-bind="attrs"
                    v-on="on"
                    >mdi-dots-vertical</v-icon
                  >
                </template>
                <v-list>
                  <v-list-item @click="deleteNote(note)" class="pointer">
                    <v-list-item-title>{{
                      $t("Delete note")
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card>
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
import { AxiosResponse } from "node_modules/axios";

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
      groupWrapper: false,
      error: "",
    };
  },
})
export default class Login extends Vue {
  private store: MyStore = useStore(this.$store);
  private noteTitle: string = "";
  private noteDescription: string = "";
  private groupName: string = "";
  private groupNameSelected: string = "";
  private groupNames: string[] = [];
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
  private deleteNote(note: INote) {
    const filteredNoteArray: INote[] = this.store.note
      .getNotes("note")
      .filter(
        (findNote: INote) => JSON.stringify(findNote) !== JSON.stringify(note)
      );
    this.notes = filteredNoteArray;
    this.store.note.setNotesLocal("note", filteredNoteArray);
  }
  private addGroupName() {
    this.$data.groupWrapper = false;
    this.groupNames.push(this.groupName);
    this.groupName = "";
    localStorage.notesGroupNames = JSON.stringify(this.groupNames);
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
  private sortByGroupName() {
    this.notes = this.store.note.sortByGroupName("note");
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
    this.notes = this.store.note.getLocal("note");
  }

  private async addNote() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      if (localStorage.isAuthOrganizer == "true") {
        await this.store.auth.getProfile();
        const user = this.store.auth.currentUser;
        const note = {
          _title: this.noteTitle,
          _description: this.noteDescription,
          _pin: this.pin,
          _group: this.groupNameSelected,
          email: user.email,
        };

        this.store.auth
          .addNote(note)
          .then((res: AxiosResponse<any>) => {
            this.$data.error = this.store.auth.error;

            if (res.data.success) {
              console.log("Succes", this.store.user);
            }
            console.log("res", res.data.notes);
            this.notes.unshift(res.data.note);
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }
      const note: INote = new Note(
        this.noteTitle,
        this.noteDescription,
        this.pin,
        this.groupNameSelected
      );
      this.store.note.saveLocal(note, "note");
      this.$data.noteTitle = "";
      this.$data.noteDescription = "";
      this.notes = this.store.note.getLocal("note");
    } else if (this.$v.$invalid) {
      console.log("not success");
    }
  }
  created() {
    this.$v.$touch();
    this.notes = this.store.note.getLocal("note");
    this.groupNames = JSON.parse(localStorage.notesGroupNames);
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
